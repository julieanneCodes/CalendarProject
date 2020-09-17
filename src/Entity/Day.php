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
     * @ORM\ManyToMany(targetEntity=Task::class, inversedBy="days")
     */
    private $taskIdDay;

    /**
     * @ORM\OneToMany(targetEntity=Calendar::class, mappedBy="calendarDay")
     */
    private $calendarDayid;

    public function __construct()
    {
        $this->taskIdDay = new ArrayCollection();
        $this->calendarDayid = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|Task[]
     */
    public function getTaskIdDay(): Collection
    {
        return $this->taskIdDay;
    }

    public function addTaskIdDay(Task $taskIdDay): self
    {
        if (!$this->taskIdDay->contains($taskIdDay)) {
            $this->taskIdDay[] = $taskIdDay;
        }

        return $this;
    }

    public function removeTaskIdDay(Task $taskIdDay): self
    {
        if ($this->taskIdDay->contains($taskIdDay)) {
            $this->taskIdDay->removeElement($taskIdDay);
        }

        return $this;
    }

    /**
     * @return Collection|Calendar[]
     */
    public function getCalendarDayid(): Collection
    {
        return $this->calendarDayid;
    }

    public function addCalendarDayid(Calendar $calendarDayid): self
    {
        if (!$this->calendarDayid->contains($calendarDayid)) {
            $this->calendarDayid[] = $calendarDayid;
            $calendarDayid->setCalendarDay($this);
        }

        return $this;
    }

    public function removeCalendarDayid(Calendar $calendarDayid): self
    {
        if ($this->calendarDayid->contains($calendarDayid)) {
            $this->calendarDayid->removeElement($calendarDayid);
            // set the owning side to null (unless already changed)
            if ($calendarDayid->getCalendarDay() === $this) {
                $calendarDayid->setCalendarDay(null);
            }
        }

        return $this;
    }
}
