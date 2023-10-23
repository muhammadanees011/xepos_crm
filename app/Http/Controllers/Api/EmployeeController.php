<?php

namespace App\Http\Controllers\Api;

use App\Models\Employee;
use App\Http\Traits\CommonTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    use CommonTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees=Employee::with('company')->get();
        return $this->sendSuccess('Employees',$employees);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $validation= Validator::make($request->all(), 
        [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'nullable|email|unique:employees,email',
            'phone' => ['nullable','unique:employees,phone','regex:/^\+?[0-9]+$/u'],
        ]);

        if($validation->fails()){
            $errors=$validation->errors();
            return $this->sendError($errors,'');
        }

        try{
            DB::beginTransaction();
            $newEmployee=Employee::create($request->all());
            DB::commit();
            return $this->sendSuccess('Saved Successfully',null);
        }catch(\Exception $exception)
        {
            DB::rollback();
            if(('APP_ENV')=='local')
            {
                dd($exception);
            }else
            {
                return $this->sendError($exception->getMessage(),null);
            }
        }     
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        $employee = Employee::find($employee);
        return $this->sendSuccess('Employee Found',$employee);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        $employee = Employee::find($employee);
        return $this->sendSuccess('Employee Found',$employee);   
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $validation= Validator::make($request->all(), 
        [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'nullable|email|unique:employees,email,'. $employee->id,
            'phone' => ['nullable','unique:employees,phone,'. $employee->id,'regex:/^\+?[0-9]+$/u'],
        ]);

        if($validation->fails()){
            $errors=$validation->errors();
            return $this->sendError($errors,'');
        }

        try{
            DB::beginTransaction();
            $newEmployee=Employee::find($employee->id)->update($request->all());
            DB::commit();
            return $this->sendSuccess('Updated Successfully',null);
        }catch(\Exception $exception)
        {
            DB::rollback();
            if(('APP_ENV')=='local')
            {
                dd($exception);
            }else
            {
                return $this->sendError($exception->getMessage(),null);
            }
        }        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee=$employee->delete();
        return $this->sendSuccess('Deleted Successfuly',null);
    }
}
