<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Candidate; // Ensure you have the Candidate model imported

class UserController extends Controller
{
    public function showElectionPage()
    {
        // Fetch all candidates from the database
        $candidates = Candidate::all();

        // Assuming 'Election' model or logic exists to fetch election data
        // Replace this with actual logic to fetch the election name
        $electionName = "Sample Election";

        // If you have specific election logic, replace this with a dynamic fetch
        // $election = Election::find($electionId);

        // Return Inertia response with the election and candidates data
        return Inertia::render('User/Users', [
            'candidates' => $candidates,
            'electionName' => $electionName,
        ]);
    }

    public function register()
    {
        return response()->json(['message' => 'Registration Page']);
    }

    /**
     * Return data for the login page.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        return response()->json(['message' => 'Login Page']);
    }
}
