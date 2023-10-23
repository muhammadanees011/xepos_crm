<?php

namespace App\Http\Controllers\Api;

use App\Models\Company;
use App\Http\Controllers\Controller;
use App\Http\Traits\CommonTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CompanyController extends Controller
{
    use CommonTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companies=Company::all();
        return $this->sendSuccess('Companies',$companies);
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
            'name' => 'required',
            'logo' => 'nullable',
            'email' => 'nullable|email|unique:companies,email',
            'website' => 'nullable|unique:companies,website'
        ]);

        if($validation->fails()){
            $errors=$validation->errors();
            return $this->sendError($errors,'');
        }

        try{
            DB::beginTransaction();
            $newCompany=Company::create($request->all());
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
    public function show(Company $company)
    {
        $company = Company::find($company);
        return $this->sendSuccess('Company Found',$company);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        $company = Company::find($company);
        return $this->sendSuccess('Company Found',$company);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Company $company)
    {
        $validation= Validator::make($request->all(), 
        [
            'name' => 'nullable',
            'logo' => 'nullable',
            'email' => 'nullable|email|unique:companies,email',
            'website' => 'nullable|unique:companies,website'
        ]);

        if($validation->fails()){
            $errors=$validation->errors();
            return $this->sendError($errors,'');
        }

        try{
            DB::beginTransaction();
            $newCompany=Company::find($company->id);
            $newCompany->name=$request->input('name');
            $newCompany->logo=$request->input('logo');
            $newCompany->email=$request->input('email');
            $newCompany->email=$request->input('email');
            $newCompany->save();
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
    public function destroy(Company $company)
    {
        $company=$company->delete();
        return $this->sendSuccess('Deleted Successfuly',null);
    }
}
