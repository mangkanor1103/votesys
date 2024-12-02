<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Election extends Model
{
    use HasFactory;

    protected $fillable = [
        'election_name',
        'election_date',
        'election_code',  // Add the election_code to the fillable array
    ];
    public function positions()
    {
        return $this->hasMany(Position::class);
    }
    public function candidates()
{
    return $this->hasMany(Candidate::class);
}

}
