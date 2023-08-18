import { Answer, Question } from 'unlocked-viewer/types/answer-injection'
import {
    Sizing,
    State as UnlockedLandingState,
} from 'unlocked-doc-landing/state/unlocked-landing-state'
import {
    NotificationData,
    NotificationState,
} from '../unlocked-viewer/types/notifications'
import { modalLogicPaths } from 'unlocked-viewer/component/smart-scan/success-modal/smart-scan-doc-state-utils'

export const mockUnlockedLandingState: UnlockedLandingState = {
    activeQuestionContent: {
        identifier: null,
        element: null,
        trigger: null,
    },
    tourRefs: {},
    userId: -1,
    userName: '',
    contentId: -1,
    filehash: '',
    viewerScale: 1,
    viewPortSize: Sizing.LARGE,
    chatViewPortSize: 'large',
    smartScanMode: false,
    sidebar: {
        collapsed: true,
    },
    isEducator: false,
    questions: {},
    answers: [],
    onSidebarContentChange: () => {},
    averageWaitTimes: {},
    currentPage: 0,
    didLoadRelatedContent: false,
    capabilities: {
        documentPlatformEnabled: false,
        includeUQAnswers: false,
        unlockUQAnswers: false,
        unlockedTourEnabled: false,
        canSpotlightCourse: true,
        answerRailCollapsed: false,
        isLifecycleStateEnabled: false,
        chromeExtensionModalEnabled: false,
        uqEntrypointRedesignEnabled: false,
    },
    documentQuestionChatEnabled: false,
    documentPaperChatEnabled: false,
    documentMobilePaperChatEnabled: false,
    subscriptionType: 'basic',
    enrichmentsDisabled: false,
    isTourActive: false,
    isMobile: false,
    smartScanDocState: modalLogicPaths.premier,
    showUnlockedTour: false,
    chatIsOpen: false,
    chatIsFromAnswerRail: false,
    chatMessages: {},
    chatKey: -1,
    documentSubject: '',
    showChromeExtensionModal: false,
    searchInfo: {
        searchResults: [],
        searchResultsTotal: 0,
        searchQuery: '',
        searchCount: 0,
    },
}

export const mockAnswerAndExplanation = {
    practice_problem_occurrence_id: 422159802,
    answer_type: 'tutor_correct_answer',
    data: 'Gemsleet pegasus',
    explanation:
        "<p>Can't see the question, so I'm not entirely sure. The answer seems to be one of the four choices, but how do I know which one? I really don't when it comes down to it. This is me just being honest, which is something I don't often do. Let's try our best to answer this anyways.</p><p> </p><p>Can't see the question, so I'm not entirely sure. The answer seems to be one of the four choices, but how do I know which one? I really don't when it comes down to it. This is me just being honest, which is something I don't often do. Let's try our best to answer this anyways.</p><p> </p><p>Can't see the question, so I'm not entirely sure. The answer seems to be one of the four choices, but how do I know which one? I really don't when it comes down to it. This is me just being honest, which is something I don't often do. Let's try our best to answer this anyways.</p><p> </p><p>Can't see the question, so I'm not entirely sure. The answer seems to be one of the four choices, but how do I know which one? I really don't when it comes down to it. This is me just being honest, which is something I don't often do. Let's try our best to answer this anyways.</p>",
    answer_identifier: 'a .',
    answer_component_id: 2337845554,
    content_type: 'document',
    content_identifier: 'fda777c1d0318a06ef341283cfbadf978b9f1458',
    match_type: 'exact_match_w_ppo_w_tutor_answer',
    question: 'Who is Emma Davis ?',
}

export const mockQuestion: Question = {
    document_question_id: 3623,
    occurrence_id: 1,
    user_id: '100000790036665',
    question_id: 48793417,
    db_filename: 8220891,
    category_id: 7,
    status: 'answered',
    page_num: '2',
    page_width: 64000,
    page_height: 82900,
    crop_x: 7500,
    crop_y: 27800,
    crop_width: 50600,
    crop_height: 9400,
    additional_comments: '',
    answer_thread_id: 127801780,
    category_name: 'Economics',
    source: 'atd',
    workflow_status: {
        status: 'error',
        message: "Sorry we couldn't get you an answer.",
        action: 'View Question Details',
        question_id: 48793417,
        from_current_user: true,
        ppo_id: 1,
    },
    locations: [],
    is_answered: false,
    question_type: '',
    has_explanation: false,
    has_injected_answer: false,
    has_external_answer: false,
    content_identifier: {
        identifier: '1',
        type: 'atd',
    },
    isLifecycleStateEnabled: false,
}

export const mockAnswer: Answer = {
    qa_thread_id: '127801780',
    occurrence_id: 1,
    question_id: 48793417,
    txt: 'D.',
    explanation:
        '<p>Option a: This option is incorrect because there is no sunk cost involve since no expenses is yet involve but opportunity cost is the correct answer. Since this is an economic choice</p><p> </p><p>Option b: This option is incorrect because in every economic choice choice or decision, there will always a corresponding opportunity cost</p><p> </p><p>Option c: This option is incorrect because the opportunity cos must be included as well.</p><p> </p><p>Option d: This option is correct because in every economic choices or decision, there will always be an opportunity cost because we cannot have all we want because our economic resources are limited. In a situation given above, there is an opportunity cost because the building used to open for a book store can be use in other purposes such as a mini grocery or a café.</p><p> </p>',
    helpful: '0',
    unhelpful: '0',
    tutor_user_id: '100000844613718',
    tutor_name: 'Chelchiong26',
    format: 'ckeditor',
    user_id: '100000790036665',
    attachments: [],
}

export const mockNotificationData: NotificationData = {
    status: NotificationState.PENDING,
    db_filename: 8220891,
    ppo_id: 1,
    question_id: 48793417,
    action_message: 'foo',
    text_message: 'bar',
}

export const expectedAnswerOutput =
    'Irrigated farming is a traditional agricultural practice developed over the centuries in countries with a hot climate. An irrigation system (IS) is a technological synthesis of water management and agriculture, realized through transportation of water from a source to an irrigated field.'
export const expectedAlternateAnswerOutput = '<p>As shown below;</p>'
export const expectedExplanationOutput =
    'The monetary prosperity of the semiarid intermountain region requires efficent utilization of accessible water supplies. Agribusiness, the significant water-polishing off industry, relies upon water system water. The reception of sprinkler frameworks that expansion on-ranch water system "efficiencies" and the region which can be flooded from upstream redirections might obstruct the "residency" of downstream water privileges. These downstream impacts should be assessed prior to permitting ranchers to utilize the water "saved" to flood extra acreages or yields to acquire more noteworthy benefits. The issue in allowing ranches to grow their inundated grounds is that the singular rancher builds his benefits through expanded wasteful use. The resulting decrease consequently streams diminishes the water accessible to the downstream irrigators and abuses the downstream client\'s legitimate freedoms. Water privileges managers have an obligation to the two clients. They need to safeguard downstream water freedoms. In doing as such, the arrangements ought not deny the individuals who put in new sprinkler situation the option to any water they truly save from inefficient immoderate use (e.g., by weeds or dissipation). A direct programming model was created to assess the impact of changes in water system innovation on basinwide trimming designs and subsequently immoderate use and return streams for downstream clients inside the Sevier River Basin. Editing decisions were produced using inforamtion on field inclines and soil types as addressed via land arrangements, destructive use for nine yields, and the qualities of four on-ranch water system frameworks (flood and sprinkler water system frameworks with lined and unlined trenches). Also, water redirections any suitable flooded acreages were compelled as far as possible forced by the State Engineer\'s Office for the purpose of safeguarding property privileges. Current water system frameworks were assessed to be productive and henceforth would be taken on with the current grounds and redirection limitations. Bowl result would increment; nonetheless, downstream water privileges wouldn\'t be met. With relations of these limitations, the ranch economy would acquire much more from the reception of new water system frameworks. Once more, present water privileges wouldn\'t be met. Government and state cost sharing projects could likewise bother the water freedoms issue and potentially cause ecological issues by diminishing instream streams. The empiracle straight programming model created to address the agrarian economy of the Sevier River Basin had the option to give sensible replication of trimming designs, wate ploy, and instream streams in the bowl. This achievement creates a trust in the model\'s capacity to appraise the impacts of transformations of new water system innovation and different bowl water the board approaches on the bropping choices made by bowl ranchers. The estiamtes made by the model give a significant device to impartial water freedoms organization, yet the outcomes would be significantly better whenever refined to join hydrologic steering, hydrosalinity impacts, ideal water system levels, and year-to-year variety in water accessibility.'
export const expectedAlternateExplanationOutput =
    '<figure class="image"><img src="/qa/attachment/28197805/" alt="28197805" /></figure><figure class="image"><img src="/qa/attachment/28197832/" alt="28197832" /></figure>'
export const expectedAnswerWithExtraTags =
    '<p>Kept this tag </p><p>And this one</p>we did not remove the other tags'
export const expectedExplanationWithExtraTags =
    'we did not remove the tags at the end<p>Kept this tag </p><p>And this one</p>'
export const expectedUnaffectedAnswerText = 'Youre gonna need a bigger boat.'
export const expectedUnaffectedExplanationText = 'Hasta la vista, baby.'

export const mockAnswersForSanitizationTests: Answer[] = [
    {
        qa_thread_id: '101929300',
        txt: '<pre><code class="language-plaintext">Irrigated farming is a traditional agricultural practice developed over the centuries in countries with a hot climate. An irrigation system (IS) is a technological synthesis of water management and agriculture, realized through transportation of water from a source to an irrigated field.</code></pre>',
        // txt: '<p>Foo</p><p>Bar</p><code class="language-plaintext">Baz</code>',
        explanation:
            '<pre><code class="language-plaintext">The monetary prosperity of the semiarid intermountain region requires efficent utilization of accessible water supplies. Agribusiness, the significant water-polishing off industry, relies upon water system water. The reception of sprinkler frameworks that expansion on-ranch water system "efficiencies" and the region which can be flooded from upstream redirections might obstruct the "residency" of downstream water privileges. These downstream impacts should be assessed prior to permitting ranchers to utilize the water "saved" to flood extra acreages or yields to acquire more noteworthy benefits. The issue in allowing ranches to grow their inundated grounds is that the singular rancher builds his benefits through expanded wasteful use. The resulting decrease consequently streams diminishes the water accessible to the downstream irrigators and abuses the downstream client\'s legitimate freedoms. Water privileges managers have an obligation to the two clients. They need to safeguard downstream water freedoms. In doing as such, the arrangements ought not deny the individuals who put in new sprinkler situation the option to any water they truly save from inefficient immoderate use (e.g., by weeds or dissipation). A direct programming model was created to assess the impact of changes in water system innovation on basinwide trimming designs and subsequently immoderate use and return streams for downstream clients inside the Sevier River Basin. Editing decisions were produced using inforamtion on field inclines and soil types as addressed via land arrangements, destructive use for nine yields, and the qualities of four on-ranch water system frameworks (flood and sprinkler water system frameworks with lined and unlined trenches). Also, water redirections any suitable flooded acreages were compelled as far as possible forced by the State Engineer\'s Office for the purpose of safeguarding property privileges. Current water system frameworks were assessed to be productive and henceforth would be taken on with the current grounds and redirection limitations. Bowl result would increment; nonetheless, downstream water privileges wouldn\'t be met. With relations of these limitations, the ranch economy would acquire much more from the reception of new water system frameworks. Once more, present water privileges wouldn\'t be met. Government and state cost sharing projects could likewise bother the water freedoms issue and potentially cause ecological issues by diminishing instream streams. The empiracle straight programming model created to address the agrarian economy of the Sevier River Basin had the option to give sensible replication of trimming designs, wate ploy, and instream streams in the bowl. This achievement creates a trust in the model\'s capacity to appraise the impacts of transformations of new water system innovation and different bowl water the board approaches on the bropping choices made by bowl ranchers. The estiamtes made by the model give a significant device to impartial water freedoms organization, yet the outcomes would be significantly better whenever refined to join hydrologic steering, hydrosalinity impacts, ideal water system levels, and year-to-year variety in water accessibility.</code></pre>',
        helpful: '0',
        unhelpful: '2',
        tutor_user_id: '100000822445936',
        tutor_name: 'snixzlyn02',
        format: 'ckeditor',
        user_id: '100000779497616',
        attachments: [],
        source_document_title: 'EEP162_PS_1',
        source_document_url: 'file/20217081/EEP162-PS-1/',
        occurrence_id: 181758111,
    },
    {
        qa_thread_id: '101951375',
        txt: '<p>As shown below;</p>',
        explanation:
            '<figure class="image"><img src="/qa/attachment/28197805/" alt="28197805" /></figure><figure class="image"><img src="/qa/attachment/28197832/" alt="28197832" /></figure>',
        helpful: '0',
        unhelpful: '0',
        tutor_user_id: '100000830719088',
        tutor_name: 'Samuelkims21',
        format: 'ckeditor',
        user_id: '100000757797748',
        attachments: [
            {
                attachment: {
                    question_attachment_id: 28197805,
                    qa_thread_id: 101951375,
                    users_filename: 'IMG_20220307_230053_899.jpg',
                    filehash: '8a7ec9f905a7268a13166bb23aa1bee51ad01b6e',
                },
                url: '//coursehero.s3.amazonaws.com/qattachments_8a7ec9f905a7268a13166bb23aa1bee51ad01b6e_th.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIAYW2E6VOLDTI35A%2F20230308%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230308T185500Z&X-Amz-SignedHeaders=host&X-Amz-Expires=514800&X-Amz-Signature=17658d2c8df42c9a7bba59b39d30509f2b33c611401c58bac959724da9bcd641',
            },
            {
                attachment: {
                    question_attachment_id: 28197832,
                    qa_thread_id: 101951375,
                    users_filename: 'IMG_20220307_230106_821.jpg',
                    filehash: 'aeb51a1251aaa18f8e5625a554765019d6139ae9',
                },
                url: '//coursehero.s3.amazonaws.com/qattachments_aeb51a1251aaa18f8e5625a554765019d6139ae9_th.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIAYW2E6VOLDTI35A%2F20230308%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230308T185500Z&X-Amz-SignedHeaders=host&X-Amz-Expires=514800&X-Amz-Signature=08f0012ca5de95159129aec2d2d34e66a02313d2ab212260384cd0a28ad9769a',
            },
        ],
        occurrence_id: 99313501,
    },
    {
        qa_thread_id: '101954457',
        txt: '<p>Kept this tag </p><p>And this one</p><pre><code class="language-plaintext">we did not remove the other tags</code></pre>',
        explanation:
            '<pre><code class="language-plaintext">we did not remove the tags at the end</code></pre><p>Kept this tag </p><p>And this one</p>',
        helpful: '0',
        unhelpful: '0',
        tutor_user_id: '100000840672844',
        tutor_name: 'ChiefJaguar2015',
        format: 'ckeditor',
        user_id: '100000757797748',
        attachments: [],
        occurrence_id: 99313317,
    },
    {
        qa_thread_id: '31023',
        txt: 'Youre gonna need a bigger boat.',
        explanation: 'Hasta la vista, baby.',
        helpful: '0',
        unhelpful: '0',
        tutor_user_id: '100000840672844',
        tutor_name: 'ChiefJaguar2015',
        format: 'ckeditor',
        user_id: '100000757797748',
        attachments: [],
        occurrence_id: 99313317,
    },
]

export const mockRelatedDocuments = {
    occurrence_id: 458554223,
    documents: [
        {
            db_filename: '158364810',
            question: 'List 19 facts about Lily Brown .',
            source_id: 492513478,
            taxonomy: {
                school: 'Yale University',
                course: '101',
                department: 'ECON',
            },
            thumbnail_url:
                '/thumb/05/64/05646000c568890a5e6ed45f2722d2ca0e8a4b85_180.jpg',
            title: 'generated-document-1.pdf',
            type: 'document_question',
            url: '/file/158364810/generated-document-1pdf/',
            views: '20',
        },
        {
            db_filename: '158364810',
            question: 'List 20 facts about Lily Brown .',
            source_id: 492513478,
            taxonomy: {
                school: 'Stanford University',
                course: '101',
                department: 'ECON',
            },
            thumbnail_url:
                '/thumb/05/64/05646000c568890a5e6ed45f2722d2ca0e8a4b85_180.jpg',
            title: 'generated-document-2.pdf',
            type: 'document_question',
            url: '/file/158364810/generated-document-1pdf/',
            views: '100',
        },
        {
            db_filename: '158364810',
            question: 'List 21 facts about Lily Brown .',
            source_id: 492513478,
            taxonomy: {
                school: 'Harvard University',
                course: '101',
                department: 'ECON',
            },
            thumbnail_url:
                '/thumb/05/64/05646000c568890a5e6ed45f2722d2ca0e8a4b85_180.jpg',
            title: 'generated-document-3.pdf',
            type: 'document_question',
            url: '/file/158364810/generated-document-1pdf/',
            views: '223',
        },
    ],
}
export const mockRecommendedQuestions = {
    alchemyTags: [],
    id: 160404614,
    impressionTargetName: 'semantic_result',
    isAnswered: true,
    isSemanticResult: true,
    isTutorAnswered: false,
    matchScore: undefined,
    numViews: 16,
    peekableAnswer:
        '1) If , at output Q , AC is at its minimum , then MC equals AC .',
    ppoid: 160404614,
    subType: 'Test',
    taxonomy: {
        course: { course_id: 1627803, course_num: '310-1' },
        department: { dept_id: 4955, dept_acro: 'ECON' },
        school: { school_id: 748, school_name: 'Northwestern University' },
    },
    text: '( 20 points ) Circle the correct answer . No explanation is necessary . ( And no partial credit is given for this question . ) I. ( 5 Points ) Which of the following is necessarily true ?',
    thumbnailUrl:
        '/thumb/dc/91/dc91746d45e59d5dd2d7492b5b0bf144a8a6f750_180.jpg',
    title: '310-1_Midterm_2_-Fall_2012_ANSWERS',
    type: 'document_question',
    url: '/file/8039520/310-1-Midterm-2-Fall-2012-ANSWERS/?ppoid=160404614&page=2',
    userUnlocked: false,
}
