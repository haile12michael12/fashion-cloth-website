<?php

namespace App\Services;

use App\Notifications\EmailNotification;
use App\Notifications\SmsNotification;
use Illuminate\Support\Facades\Log;

class NotificationService
{
    /**
     * Send email notification
     */
    public function sendEmail($notifiable, $subject, $message, $data = [])
    {
        try {
            $notifiable->notify(new EmailNotification($subject, $message, $data));
            return ['success' => true, 'message' => 'Email sent successfully'];
        } catch (\Exception $e) {
            Log::error('Email notification failed: ' . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to send email: ' . $e->getMessage()];
        }
    }

    /**
     * Send SMS notification
     */
    public function sendSms($notifiable, $message, $data = [])
    {
        try {
            $notifiable->notify(new SmsNotification($message, $data));
            return ['success' => true, 'message' => 'SMS sent successfully'];
        } catch (\Exception $e) {
            Log::error('SMS notification failed: ' . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to send SMS: ' . $e->getMessage()];
        }
    }

    /**
     * Send both email and SMS notifications
     */
    public function sendBoth($notifiable, $subject, $emailMessage, $smsMessage, $data = [])
    {
        $emailResult = $this->sendEmail($notifiable, $subject, $emailMessage, $data);
        $smsResult = $this->sendSms($notifiable, $smsMessage, $data);

        return [
            'email' => $emailResult,
            'sms' => $smsResult
        ];
    }
}