<?php

namespace App\Form;

use App\Entity\UserConfig;
use App\Form\Type\HiddenIdType;
use App\Form\DataTransformer\UserIdTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserConfigType extends AbstractType
{
    private $transformer;

    public function __construct(UserIdTransformer $transformer)
    {
        $this->transformer= $transformer;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('color', ChoiceType::class, [
                'choices' => [
                    'light' => 'light',
                    'dark' => 'dark'
                ],
                'expanded' => true
            ])
            ->add('panel_view', ChoiceType::class, array(
                'choices' => [
                    'cosa' => '0',
                    'coso' => '1'
                ],
                'expanded' => true
            ))
            ->add('user', HiddenIdType::class);
            $builder->get('user')->addModelTransformer($this->transformer);
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => UserConfig::class,
        ]);
    }
}
