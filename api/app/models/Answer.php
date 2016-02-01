<?php

namespace QaApp\Models;

class Answer extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $answer_id;

    /**
     *
     * @var string
     */
    public $answer_message;

    /**
     *
     * @var string
     */
    public $user_name;

    /**
     *
     * @var integer
     */
    public $question_id;

    /**
     *
     * @var string
     */
    public $answer_creation_time;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->skipAttributes([
            "answer_id"
        ]);


        $this->skipAttributesOnUpdate([
            "answer_creation_time"
        ]);

        $this->belongsTo('question_id', 'QaApp\Models\Question', 'question_id', array('alias' => 'Question'));
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'answer';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Answer[]
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    public function beforeCreate()
    {
        $this->answer_creation_time = date ("Y-m-d H:i:s", time());
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Answer
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}
