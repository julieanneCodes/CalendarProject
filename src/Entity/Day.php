<?php

namespace App\Entity;

use App\Repository\DayRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=DayRepository::class)
 */
class Day
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Task::class, inversedBy="day_taskId")
     */
    private $task_day;
    /**
     * @ORM\ManyToOne(targetEntity=Calendar::class, inversedBy="calendar_idDay")
     */
    private $calendar_day;

    public function __construct()
    {
        $this->task_day = new ArrayCollection();
        $this->calendar_day = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|Task[]
     */
    public function getTaskDay(): Collection
    {
        return $this->task_day;
    }

    public function addTaskDay(Task $taskDay): self
    {
        if (!$this->task_day->contains($taskDay)) {
            $this->task_day[] = $taskDay;
            $taskDay->setDayTaskId($this);
        }

        return $this;
    }

    public function removeTaskDay(Task $taskDay): self
    {
        if ($this->task_day->contains($taskDay)) {
            $this->task_day->removeElement($taskDay);
            // set the owning side to null (unless already changed)
            if ($taskDay->getDayTaskId() === $this) {
                $taskDay->setDayTaskId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Calendar[]
     */
    public function getCalendarDay(): Collection
    {
        return $this->calendar_day;
    }

    public function addCalendarDay(Calendar $calendarDay): self
    {
        if (!$this->calendar_day->contains($calendarDay)) {
            $this->calendar_day[] = $calendarDay;
            $calendarDay->setCalendarIdDay($this);
        }

        return $this;
    }

    public function removeCalendarDay(Calendar $calendarDay): self
    {
        if ($this->calendar_day->contains($calendarDay)) {
            $this->calendar_day->removeElement($calendarDay);
            // set the owning side to null (unless already changed)
            if ($calendarDay->getCalendarIdDay() === $this) {
                $calendarDay->setCalendarIdDay(null);
            }
        }

        return $this;
    }
}
