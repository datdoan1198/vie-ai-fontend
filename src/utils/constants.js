export const DEFAULT_ERROR_MESSAGE = "Đã xảy ra lỗi! Vui lòng thử lại sau."
export const OPTION_SELECT_LIMIT = [
    {
        value: 10,
        label: '10',
    },
    {
        value: 20,
        label: '20',
    },
    {
        value: 50,
        label: '50',
    },
    {
        value: 100,
        label: '100',
    }
];

export const PERMISSION = {
    SUPER_ADMIN: 'super-admin',
}

export const ColorMain = "#4ca1f5"

export const EXERCISE_TYPES = {
    SINGLE_CHOICE: 'single_choice',
    MULTIPLE_CHOICE: 'multiple_choice',
    MATCH: 'match',
    FILL_IN_BLANK: 'fill_in_blank',
    SPEAK: 'speak',
    LISTEN: 'listen',
}

export const PROMPT_EXERCISE_TYPES = {
    TEXT: 'text',
    AUDIO: 'audio',
    IMAGE: 'image',
    CONNECT_WORD: 'connect_word'
}

export const CHOICE_TYPES = {
    TEXT: 'text',
    IMAGE: 'image',
    AUDIO: 'audio',
}

export const OPTION_TYPE_EXERCISE = [
    {
        value: EXERCISE_TYPES.SINGLE_CHOICE,
        label: 'Chọn một đáp án',
    },
    {
        value: EXERCISE_TYPES.MULTIPLE_CHOICE,
        label: 'Chọn nhiều đáp án',
    },
    {
        value: EXERCISE_TYPES.MATCH,
        label: 'Nối từ',
    },
    {
        value: EXERCISE_TYPES.FILL_IN_BLANK,
        label: 'Điền từ vào chỗ trống',
    },
    {
        value: EXERCISE_TYPES.LISTEN,
        label: 'Nghe',
    }
]

export const OPTION_PROMPT_TYPE_1 = [
    {
        value: PROMPT_EXERCISE_TYPES.TEXT,
        label: 'Dạng văn bản',
    },
    {
        value: PROMPT_EXERCISE_TYPES.IMAGE,
        label: 'Dạng ảnh',
    },
    {
        value: PROMPT_EXERCISE_TYPES.AUDIO,
        label: 'Dạng audio',
    }
]

export const OPTION_PROMPT_TYPE_2 = [
    {
        value: PROMPT_EXERCISE_TYPES.TEXT,
        label: 'Dạng ghép các từ thành câu hoàn chỉnh',
    },
    {
        value: PROMPT_EXERCISE_TYPES.CONNECT_WORD,
        label: 'Dạng nối từ',
    }
]

export const PROMPT_EXERCISE_LISTEN_TYPES = {
    ENTER_INPUT: 'enter_input',
    WORD_ARRANGEMENT: 'word_arrangement',
}

export const OPTION_PROMPT_TYPE_LISTEN = [
    {
        value: PROMPT_EXERCISE_LISTEN_TYPES.ENTER_INPUT,
        label: 'Hãy nghe và nhập đáp án đúng',
    },
    {
        value: PROMPT_EXERCISE_LISTEN_TYPES.WORD_ARRANGEMENT,
        label: 'Hãy nghe và sắp xếp các từ sau thành đáp án đúng',
    }
]

export const OPTION_CHOICE_TYPES = [
    {
        value: CHOICE_TYPES.TEXT,
        label: 'Dạng cơ bản',
    },
    {
        value: CHOICE_TYPES.IMAGE,
        label: 'Dạng ảnh',
    },
    {
        value: CHOICE_TYPES.AUDIO,
        label: 'Dạng audio',
    }
]
