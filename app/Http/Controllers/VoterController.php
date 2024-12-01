<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Voter;
use App\Models\Election;

class VoterController extends Controller
{
    public function generateVoterCodes(Request $request)
    {
        $validated = $request->validate([
            'election_id' => 'required|exists:elections,id',
            'number_of_codes' => 'required|integer|min:1',
        ]);

        $election = Election::find($validated['election_id']);
        $numberOfCodes = $validated['number_of_codes'];

        // Generate the voter codes
        $voterCodes = [];
        for ($i = 0; $i < $numberOfCodes; $i++) {
            $voterCodes[] = $this->generateUniqueVoterCode();
        }

        // Store the codes in the database
        foreach ($voterCodes as $code) {
            Voter::create([
                'election_id' => $election->id,
                'code' => $code,
            ]);
        }

        return response()->json(['message' => 'Voter codes generated successfully!'], 200);
    }

    private function generateUniqueVoterCode()
    {
        // Generate a random, unique voter code
        return strtoupper(bin2hex(random_bytes(4))); // Generates an 8-character code
    }
}
