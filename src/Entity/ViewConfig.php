<?php

namespace App\Entity;

use App\Repository\ViewConfigRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ViewConfigRepository::class)
 */
class ViewConfig
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="viewConfig")
     */
    private $panel_view;

    /**
     * @ORM\Column(type="string", length=10, nullable=true)
     */
    private $panel_name;
    
    public function __construct()
    {
        $this->panel_view = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|User[]
     */
    public function getPanelView(): Collection
    {
        return $this->panel_view;
    }

    public function addPanelView(User $panelView): self
    {
        if (!$this->panel_view->contains($panelView)) {
            $this->panel_view[] = $panelView;
            $panelView->setViewConfig($this);
        }

        return $this;
    }

    public function removePanelView(User $panelView): self
    {
        if ($this->panel_view->removeElement($panelView)) {
            // set the owning side to null (unless already changed)
            if ($panelView->getViewConfig() === $this) {
                $panelView->setViewConfig(null);
            }
        }

        return $this;
    }

    public function getPanelName(): ?string
    {
        return $this->panel_name;
    }

    public function setPanelName(string $panel_name): self
    {
        $this->panel_name = $panel_name;

        return $this;
    }
}
