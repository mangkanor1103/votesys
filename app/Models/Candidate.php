<?php
// app/Models/Candidate.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;
    protected $fillable = ['election_id', 'position_id', 'name', 'platform', 'photo'];


    public function position()
    {
        return $this->belongsTo(Position::class);
    }

    public function election()
    {
        return $this->belongsTo(Election::class);
    }
    public function voter()
    {
        return $this->belongsTo(Voter::class);
    }
    public function vote()
    {
        return $this->belongsTo(Voter::class);
    }
}
