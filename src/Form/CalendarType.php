<?php

namespace App\Form;

use App\Entity\Calendar;
use App\Form\DataTransformer\UserIdTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use App\Form\Type\HiddenIdType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CalendarType extends AbstractType
{
    
    private $transformer;

    public function __construct(UserIdTransformer $transformer)
    {
        $this->transformer= $transformer;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('event_name')
            ->add('time')
            ->add('day', DateType::class, [
                'placeholder' => ['year' => 'Año', 'month' => 'mes', 'day' => 'día'],
                'widget' => 'choice',
                'years' => range(2020,2025),
            ])
            ->add('user', HiddenIdType::class)
            ->add('notes');
        $builder->get('user')->addModelTransformer($this->transformer);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Calendar::class,
        ]);
    }
}
