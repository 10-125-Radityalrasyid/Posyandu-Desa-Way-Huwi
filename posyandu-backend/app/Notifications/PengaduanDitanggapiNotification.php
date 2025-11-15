<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PengaduanDitanggapiNotification extends Notification
{
    use Queueable;
    public $pengaduan;

    public function __construct($pengaduan) { $this->pengaduan = $pengaduan; }

    public function via($notifiable) { return ['mail']; }

    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('Tanggapan Pengaduan Posyandu')
                    ->greeting('Halo, ' . $this->pengaduan->nama_pengadu)
                    ->line('Pengaduan Anda dengan subjek "' . $this->pengaduan->subjek . '" telah ditanggapi.')
                    ->line('Berikut adalah tanggapannya:')
                    ->line($this->pengaduan->balasan)
                    ->action('Lihat Halaman Utama', url('/public'))
                    ->line('Terima kasih atas perhatian Anda.');
    }
}
