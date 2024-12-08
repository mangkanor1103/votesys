<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Student;

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

        // Return a success message along with a redirect URL
        return response()->json([
            'message' => 'Registration successful',
            'redirect_url' => route('student.dashboard') // Assuming you have a route for StuDashboard
        ], 201);
    }
}
