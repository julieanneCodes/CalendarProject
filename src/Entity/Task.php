<?php

namespace App\Entity;

use App\Repository\TaskRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TaskRepository::class)
 */
class Task
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="tasks")
     */
    private $user;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $day;

    /**
     * @ORM\OneToMany(targetEntity=Day::class, mappedBy="task_day")
     */
    private $day_taskId;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getDay(): ?\DateTimeInterface
    {
        return $this->day;
    }

    public function setDay(?\DateTimeInterface $day): self
    {
        $this->day = $day;

        return $this;
    }

    public function getDayTaskId(): ?Day
    {
        return $this->day_taskId;
    }

    public function setDayTaskId(?Day $day_taskId): self
    {
        $this->day_taskId = $day_taskId;

        return $this;
    }
}
