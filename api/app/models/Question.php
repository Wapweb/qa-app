<?php

namespace QaApp\Models;

class Question extends \Phalcon\Mvc\Model
{
    const TYPE_ALL = "all";
    const TYPE_ANSWERED = "answered";
    const TYPE_UNANSWERED = "unanswered";

    /**
     *
     * @var integer
     */
    public $question_id;

    /**
     *
     * @var string
     */
    public $question_message;

    /**
     *
     * @var string
     */
    public $question_status;

    /**
     *
     * @var string
     */
    public $user_name;

    /**
     *
     * @var string
     */
    public $question_creation_time;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->skipAttributes([
            "question_id",
        ]);

        $this->skipAttributesOnCreate([
            "question_status"
        ]);

        $this->skipAttributesOnUpdate([
            "question_creation_time"
        ]);

        $this->hasMany('question_id', 'QaApp\Models\Answer', 'question_id', array('alias' => 'Answers'));
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'question';
    }

    public function beforeCreate()
    {
        $this->question_creation_time = date ("Y-m-d H:i:s", time());
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Question[]
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Question
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

    public static function findAllByType($type = "all")
    {
        $type = self::_getType($type);

        if($type == self::TYPE_ALL)
            return self::find();

        return self::find(["question_status='$type'"]);
    }

    private static function _getType($type = "all")
    {
        $types = [
            self::TYPE_ALL => true,
            self::TYPE_ANSWERED => true,
            self::TYPE_UNANSWERED => true
        ];

        return isset($types[$type]) ? $type : self::TYPE_ALL;
    }

}
