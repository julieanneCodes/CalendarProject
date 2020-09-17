<?php

namespace App\Entity;

use App\Repository\UserConfigRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=UserConfigRepository::class)
 */
class UserConfig
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=User::class, inversedBy="config_id", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=10)
     */
    private $color;

    /**
     * @ORM\Column(type="integer")
     */
    private $panel_view;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): self
    {
        $this->color = $color;

        return $this;
    }

    public function getPanelView(): ?int
    {
        return $this->panel_view;
    }

    public function setPanelView(int $panel_view): self
    {
        $this->panel_view = $panel_view;

        return $this;
    }
}
