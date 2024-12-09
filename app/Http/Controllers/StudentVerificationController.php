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
    $request->validate([
        'school_id' => 'required',
        'password' => 'required',
    ]);

    $student = DB::table('students')->where('school_id', $request->school_id)->first();

    if ($student && Hash::check($request->password, $student->password)) {
        return response()->json(['success' => true]); // Confirm this response
    }

    return response()->json(['success' => false, 'message' => 'Invalid credentials.'], 401);
}


    

}
