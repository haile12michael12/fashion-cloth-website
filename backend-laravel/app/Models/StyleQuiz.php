<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StyleQuiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'questions'
    ];

    protected $casts = [
        'questions' => 'array'
    ];
}