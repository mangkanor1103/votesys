<?php

namespace App\Http\Controllers;

use App\Models\Voter;
use App\Models\Election;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class VoterController extends Controller
{
    /**
 * Show the list of voters.
 *
 * @param \Illuminate\Http\Request $request
 * @return \Inertia\Response|\Illuminate\Http\JsonResponse
 */
public function index(Request $request)
{
    // Fetch all voters from the database
    $voters = Voter::with('election:id,election_name')->get();

    // Check if the request expects a JSON response (e.g., from an API call)
    if ($request->wantsJson()) {
        return response()->json($voters); // Return JSON response for API calls
    }

    // Return the view with the voters data using Inertia for normal requests
    return Inertia::render('Admin/Voters', [
        'voters' => $voters,
    ]);
}



    /**
     * Generate voter codes for an election.
     */
    public function generate(Request $request)
    {
        $request->validate([
            'election_id' => 'required|exists:elections,id',
            'number_of_codes' => 'required|integer|min:1',
        ]);

        $codes = [];
        for ($i = 0; $i < $request->number_of_codes; $i++) {
            $code = Str::random(8);
            Voter::create([
                'election_id' => $request->election_id,
                'voter_code' => $code,
            ]);
            $codes[] = $code;
        }

        return response()->json(['codes' => $codes]);
    }

    /**
     * Fetch voters based on election ID.
     */
    public function fetch($electionId)
    {
        $voters = Voter::where('election_id', $electionId)->get(['voter_code']);
        return response()->json([
            'voters' => $voters
        ]);
    }

    /**
     * Clear all voter codes for a specific election ID.
     */
    public function clear($electionId)
    {
        try {
            Voter::where('election_id', $electionId)->delete();
            return response()->json([
                'message' => 'All voter codes cleared successfully!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to clear voter codes.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Login using voter code and redirect to the voters dashboard.
     */
    public function login(Request $request)
    {
        // Validate the incoming voter code
        $request->validate([
            'voter_code' => 'required|exists:voters,voter_code', // Ensure the voter code exists
        ]);

        // Fetch the voter associated with the voter code
        $voter = Voter::where('voter_code', $request->voter_code)->first();

        if (!$voter) {
            // If no voter is found with the given code, return an error
            return back()->withErrors(['voter_code' => 'Invalid voter code.']);
        }

        // If voter code is valid, redirect to the voter dashboard
        return redirect()->route('voter.dashboard', ['id' => $voter->id]);
    }

    /**
     * Show the voters dashboard.
     */
    public function dashboard($id, Request $request)
    {
        // Fetch the voter based on the voter ID
        $voter = Voter::findOrFail($id);

        // Fetch the election related to the voter
        $election = Election::findOrFail($voter->election_id);

        // Fetch positions for the election
        $positions = $election->positions()->with('candidates')->get()->map(function ($position) {
            return [
                'id' => $position->id,
                'name' => $position->name,
                'maxVotes' => $position->max_votes,
                'candidates' => $position->candidates->map(function ($candidate) {
                    return [
                        'id' => $candidate->id,
                        'name' => $candidate->name,
                        'platform' => $candidate->platform,
                    ];
                }),
            ];
        });

        // Pass data to Inertia
        return inertia('Voter/Dashboard', [
            'voterId' => $voter->id,
            'voterCode' => $voter->voter_code,
            'electionId' => $election->id,
            'electionName' => $election->election_name,
            'positions' => $positions,
        ]);
    }




}
