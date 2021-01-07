<?php

namespace App\Form;

use App\Entity\Calendar;
use App\Form\DataTransformer\UserIdTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use App\Form\Type\HiddenIdType;
use Symfony\Component\Form\Extension\Core\Type\TimeType;
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
        date_default_timezone_set("Europe/Madrid");
        $currentDate = date('Y-m-d');
        $currentTime = date('H:i', strtotime('+1 hour'));
        $currentPlusTime = date('H:i', strtotime('+2 hour'));
        $builder
            ->add('event_name')
            ->add('day', DateType::class, [
                'widget' => 'single_text',
                'label' => 'Start date ',
                'attr' => [
                    'min' => $currentDate, 
                    'value' => $currentDate
                ],
            ])
            ->add('time', TimeType::class, [
                'widget' => 'single_text',
                'label' => 'Start time ',
                'attr' => [
                  'value' => $currentTime
                ]
            ])
            ->add('secondday', DateType::class, [
                'widget' => 'single_text',
                'label' => 'End date ',
                'attr' => [
                    'min' => $currentDate, 
                    'value' => $currentDate
                ],
            ])
            ->add('secondtime', TimeType::class, [
                'label' => 'End time ',
                'widget' => 'single_text',
                'attr' => [
                  'value' => $currentPlusTime
                ]
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
