<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserStyleProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'quiz_responses',
        'style_type',
        'preferences'
    ];

    protected $casts = [
        'quiz_responses' => 'array',
        'preferences' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}