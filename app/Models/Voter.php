<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voter extends Model
{
    use HasFactory;

    protected $fillable = ['election_id', 'voter_code'];

    public function election()
    {
        return $this->belongsTo(Election::class);
    }
    public function position()
    {
        return $this->belongsTo(Position::class);
    }

    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }
    public function vote()
    {
        return $this->belongsTo(Voter::class);
    }
}
