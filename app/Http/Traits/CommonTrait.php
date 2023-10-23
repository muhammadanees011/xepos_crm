<?php
namespace App\Http\Traits;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

trait CommonTrait {

    /**
     * Send Succes Message
     *
     * @param [type] $message
     * @param string $data
     * @return void
     */
    function sendSuccess($message, $data = '') {
        //return Response::json(array('status' => 200, 'successMessage' => $message, 'successData' => $data), 200, []);
        return response()->json([
            'status' => 200,
            'message' => $message,
            'data' => $data,
        ]);
    }

    /**
     * Show error message 
     *
     * @param [type] $error_message
     * @param string $code
     * @param [type] $data
     * @return void
     */
    function sendError($error_message, $code = '', $data = NULL) {
        //return Response::json(array('status' => 400, 'errorMessage' => $error_message), 400);
        return response()->json([
            'status' => 400,
            'message' => $error_message,
            'data' => $data,
        ]);
    }

    /**
     * Add Image in local storage
     *
     * @param [type] $file
     * @param [type] $path
     * @return void
     */
    function addFile($file, $path) {
        if ($file) {
            if ($file->getClientOriginalExtension() != 'exe') {
                $type = $file->getClientMimeType();
                if ($type == 'image/jpg' || $type == 'image/jpeg' || $type == 'image/png' || $type == 'image/bmp') {
                    $destination_path = $path;
                    $extension = $file->getClientOriginalExtension();
                    $fileName = Str::random(15) . '.' . $extension;
                    //$img=Image::make($file);
                    if (($file->getSize() / 1000) > 2000) {

                        //Image::make($file)->save('public/'.$destination_path. $fileName, 30);
                        $file->save($destination_path . $fileName, 30);
                        $file_path = $destination_path . $fileName;
                    } else {
                        $file->move($destination_path, $fileName);
                        $file_path = $destination_path . $fileName;}
                    return $file_path;
                } else {
                    return FALSE;
                }
            } else {
                return FALSE;
            }
        } else {
            return FALSE;
        }
    }

}