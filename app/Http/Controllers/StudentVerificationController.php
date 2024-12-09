<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Student;
use Illuminate\Support\Facades\DB;


class StudentVerificationController extends Controller
{
    public function store(Request $request)
    {
        // Validate input
        $request->validate([
            'school_id' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'password' => 'required|string|min:8',
        ]);

        // Store in database
        $student = Student::create([
            'school_id' => $request->school_id,
            'name' => $request->name,
            'department' => $request->department,
            'password' => Hash::make($request->password), // Hash the password
        ]);

        // Return a success message along with a redirect URL or route name
        return response()->json([
            'message' => 'Registration successful',
            'redirect' => '/student', // The route to redirect after successful registration
        ], 201);
    }


    public function login(Request $request)
    {
        // Validate input fields
        $request->validate([
            'school_id' => 'required',
            'password' => 'required',
        ]);

        // Find the student by school_id
        $student = DB::table('students')->where('school_id', $request->school_id)->first();

        // If the student is not found
        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'The school ID does not exist. Please check your ID and try again.',
            ], 404); // Not Found HTTP status
        }

        // If the password is incorrect
        if (!Hash::check($request->password, $student->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Incorrect password. Please try again.',
            ], 401); // Unauthorized HTTP status
        }

        // Successful login
        return response()->json([
            'success' => true,
            'student' => [
                'id' => $student->id,
                'school_id' => $student->school_id,
                'name' => $student->name,
                'department' => $student->department,
            ],
            'message' => 'Login successful.',
        ], 200); // OK HTTP status
    }





}
