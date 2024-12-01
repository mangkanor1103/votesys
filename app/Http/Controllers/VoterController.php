<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VoterCode;
use Illuminate\Support\Str;

class VoterController extends Controller
{
    public function generate(Request $request)
{
    $request->validate([
        'election_id' => 'required|exists:elections,id',
        'number_of_codes' => 'required|integer|min:1',
    ]);

    $electionId = $request->input('election_id'); // Match frontend key
    $numberOfCodes = $request->input('number_of_codes');

    for ($i = 0; $i < $numberOfCodes; $i++) {
        VoterCode::create([
            'election_id' => $electionId,
            'voter_code' => Str::random(10),
        ]);
    }

    return response()->json(['message' => 'Voter codes generated successfully.']);
}

    public function generateVoterCodes(Request $request, $electionId)
    {
        $request->validate([
            'numCodes' => 'required|integer|min:1',
        ]);

        $numCodes = $request->input('numCodes');
        $voterCodes = [];

        for ($i = 0; $i < $numCodes; $i++) {
            $voterCodes[] = [
                'election_id' => $electionId,
                'code' => strtoupper(uniqid()),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        VoterCode::insert($voterCodes);

        return back()->with('success', "$numCodes voter codes generated successfully.");
    }
}
