<?php

namespace App\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\OptionsResolver;
use Symfony\Component\OptionsResolver\OptionsResolver as OptionsResolverOptionsResolver;
use Symfony\Component\Security\Core\Security;

class HiddenIdType extends AbstractType
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security= $security;
    }
    public function configureOptions(OptionsResolverOptionsResolver $resolver)
    {
        $user = $this->security->getUser();
        $resolver->setDefaults([
            'data' => $user->getId(),
        ]);
    }

    public function getParent()
    {
        return HiddenType::class;
    }
}