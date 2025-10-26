<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AIRecommendation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'input_data',
        'recommendations'
    ];

    protected $casts = [
        'input_data' => 'array',
        'recommendations' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}