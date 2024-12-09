<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Student;

class AuthenticatedSessionController extends Controller
{
    // Handle student login
    public function login(Request $request)
    {
        $request->validate([
            'school_id' => 'required|string',
            'password' => 'required|string',
        ]);

        // Check if user exists and credentials are correct
        $student = Student::where('school_id', $request->school_id)->first();

        if ($student && password_verify($request->password, $student->password)) {
            // Here you would authenticate the user, e.g., by using sessions or a token.
            Auth::login($student);

            // Redirect to the dashboard page or return a success response
            return response()->json([
                'message' => 'Login successful',
                'redirect' => '/student/dashboard', // Redirect URL
            ], 200);
        }

        // Return error if credentials are invalid
        return response()->json([
            'message' => 'Invalid credentials',
        ], 401);
    }

    // Handle dashboard
    public function dashboard()
    {
        return view('student.dashboard');
    }
}
