<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LookBookItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'look_book_id',
        'picture_id',
        'x_position',
        'y_position'
    ];

    public function lookBook()
    {
        return $this->belongsTo(LookBook::class);
    }

    public function picture()
    {
        return $this->belongsTo(Picture::class);
    }
}