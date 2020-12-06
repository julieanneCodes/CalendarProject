<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=CalendarRepository::class)
 */
class Calendar
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="time")
     * @Groups({"calendar_data"})
     * 
     */
    private $time;

    /**
     * @ORM\Column(type="date")
     * @Groups({"calendar_data"})
     */
    private $day;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="calendars")
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     * @Groups({"calendar_data"})
     */
    private $notes;

    /**
     * @ORM\Column(type="string", length=20)
     * @Groups({"calendar_data"})
     */
    private $eventname;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTime(): ?\DateTimeInterface
    {
        return $this->time;
    }

    public function setTime(\DateTimeInterface $time): self
    {
        $this->time = $time;

        return $this;
    }

    public function getDay(): ?\DateTimeInterface
    {
        return $this->day;
    }

    public function setDay(\DateTimeInterface $day): self
    {
        $this->day = $day;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getNotes(): ?string
    {
        return $this->notes;
    }

    public function setNotes(?string $notes): self
    {
        $this->notes = $notes;

        return $this;
    }

    public function getEventName(): ?string
    {
        return $this->eventname;
    }

    public function setEventName(string $eventname): self
    {
        $this->eventname = $eventname;

        return $this;
    }
}
