<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Student;

class StudentController extends Controller
{
    /**
     * Store a newly registered student in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'school_id' => 'required|unique:students,school_id',
            'name' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $student = new Student();
        $student->school_id = $request->school_id;
        $student->name = $request->name;
        $student->department = $request->department;
        $student->password = Hash::make($request->password);

        if ($student->save()) {
            return response()->json(['message' => 'Student registered successfully'], 201);
        }

        return response()->json(['message' => 'Failed to register student'], 500);
    }

}
