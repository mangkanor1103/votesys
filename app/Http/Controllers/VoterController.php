<?php

namespace App\Http\Controllers;

use App\Models\Voter;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class VoterController extends Controller
{
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

    public function fetch($electionId)
{
    $voters = Voter::where('election_id', $electionId)->get(['voter_code']);
    return response()->json([
        'voters' => $voters
    ]);


}

public function clear($electionId)
{
    try {
        // Delete all voter codes for the given election ID
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
}
