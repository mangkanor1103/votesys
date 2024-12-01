<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoterCode extends Model
{
    use HasFactory;

    protected $fillable = ['election_id', 'voter_code'];

    public function election()
    {
        return $this->belongsTo(Election::class);
    }
}
