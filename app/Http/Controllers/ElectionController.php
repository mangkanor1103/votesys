<?php

namespace App\Http\Controllers;

use App\Models\Election;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ElectionController extends Controller
{
    /**
     * Show the list of elections.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Fetch all elections from the database
        $elections = Election::all();

        // Return the view with the elections data
        return Inertia::render('SuperAdmin/Elections', [
            'elections' => $elections,
        ]);
    }
// Assuming you have a LoginController or a method in ElectionController to handle login
// ElectionController.php

public function login(Request $request)
{
    // Validate the incoming election code
    $request->validate([
        'election_code' => 'required|exists:elections,election_code', // Ensure the election code exists
    ]);

    // Fetch the election associated with the election code
    $election = Election::where('election_code', $request->election_code)->first();

    if (!$election) {
        // If no election is found with the given code, return an error
        return back()->withErrors(['election_code' => 'Invalid election code.']);
    }

    // If election code is valid, redirect to the election dashboard
    return redirect()->route('election.dashboard', ['election' => $election->id]);
}
// ElectionController.php

public function showDashboard($id)
{
    // Find the election by ID
    $election = Election::findOrFail($id);

    // Return the election dashboard view with the election data
    return Inertia::render('ElectionDashboard', [
        'election' => $election,
    ]);
}

    /**
     * Store a newly created election in the database.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'election_name' => 'required|string|max:255',
            'election_date' => 'required|date',
        ]);

        // Generate a random election code
        $election_code = $this->generateElectionCode();

        // Check if the election code already exists to ensure uniqueness
        while (Election::where('election_code', $election_code)->exists()) {
            $election_code = $this->generateElectionCode();
        }

        // Create a new election record in the database
        Election::create([
            'election_name' => $validated['election_name'],
            'election_date' => $validated['election_date'],
            'election_code' => $election_code,
        ]);

        // Redirect back to the elections list with a success message
        return redirect()->route('superadmin.elections')
            ->with('success', 'Election created successfully!');
    }

    /**
     * Show the details of a specific election.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        // Find the election or fail with a 404 error
        $election = Election::findOrFail($id);

        // Return the details view with the election data
        return Inertia::render('SuperAdmin/ElectionShow', [
            'election' => $election,
        ]);
    }

    /**
     * Generate a random election code.
     *
     * @return string
     */
    private function generateElectionCode()
    {
        // Generate a code with 4 random uppercase letters followed by 4 digits
        return strtoupper(Str::random(4)) . '-' . rand(1000, 9999);
    }
    public function validateElectionCode(Request $request)
    {
        $request->validate([
            'election_code' => 'required|string',
        ]);

        // Fixing the column name to 'election_code'
        $election = Election::where('election_code', $request->election_code)->first();

        if ($election) {
            return response()->json([
                'success' => true,
                'election' => [
                    'id' => $election->id,
                    'code' => $election->election_code,
                    'name' => $election->election_name,
                    'date' => $election->election_date,
                ],
            ]);
        }

        return response()->json(['success' => false, 'message' => 'Invalid election code.'], 400);
    }


    public function destroy($id)
{
    $election = Election::find($id);

    if (!$election) {
        return redirect()->route('elections.index')->with('error', 'Election not found');
    }

    $election->delete();

    return redirect()->route('elections.index')->with('success', 'Election deleted successfully');
}

}
