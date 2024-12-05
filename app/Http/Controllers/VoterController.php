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
        $voter = Voter::findOrFail($id);  // Find the voter by ID or fail with a 404

        // Fetch the election related to the voter
        $election = Election::findOrFail($voter->election_id);  // Use the election_id from the voter record

        // Fetch all positions associated with the election
        $positions = $election->positions;  // Assuming a relationship exists between Election and Position

        // Format the positions to include only the details needed
        $formattedPositions = $positions->map(function ($position) {
            return [
                'id' => $position->id,
                'name' => $position->name,
                'maxVotes' => $position->max_votes,
            ];
        });

        // Pass the data to the React component via Inertia
        return inertia('Voter/Dashboard', [
            'voterId' => $voter->id,
            'voterCode' => $voter->voter_code,
            'electionId' => $election->id,
            'electionName' => $election->election_name,
            'positions' => $formattedPositions, // Add positions to the data passed
        ]);
    }




}
