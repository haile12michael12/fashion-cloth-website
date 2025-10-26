<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NotificationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Notification routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/notifications/email', [NotificationController::class, 'sendEmail']);
    Route::post('/notifications/sms', [NotificationController::class, 'sendSms']);
    Route::post('/notifications/both', [NotificationController::class, 'sendBoth']);
});