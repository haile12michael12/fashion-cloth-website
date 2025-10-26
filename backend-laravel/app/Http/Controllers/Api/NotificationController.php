<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class NotificationController extends Controller
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function sendEmail(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'subject' => 'required|string',
            'message' => 'required|string',
        ]);

        $user = User::findOrFail($request->user_id);
        
        $result = $this->notificationService->sendEmail(
            $user,
            $request->subject,
            $request->message
        );

        return Response::json($result);
    }

    public function sendSms(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'message' => 'required|string',
        ]);

        $user = User::findOrFail($request->user_id);
        
        $result = $this->notificationService->sendSms(
            $user,
            $request->message
        );

        return Response::json($result);
    }

    public function sendBoth(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'subject' => 'required|string',
            'email_message' => 'required|string',
            'sms_message' => 'required|string',
        ]);

        $user = User::findOrFail($request->user_id);
        
        $result = $this->notificationService->sendBoth(
            $user,
            $request->subject,
            $request->email_message,
            $request->sms_message
        );

        return Response::json($result);
    }
}