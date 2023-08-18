import React from 'react'
import { Answer } from 'unlocked-viewer/types/answer-injection'
import { QuestionState } from 'unlocked-viewer/state/unlocked-viewer-state'
import UnlockedLandingContext from '../hooks/use-unlocked-landing-state'
import Reducer from 'unlocked-doc-landing/state/reducer'
import { SidebarState } from '../../component/unlocked-doc-sidebar/index'
import {
    modalLogicPaths,
    SmartScanDocStateSchema,
} from 'unlocked-viewer/component/smart-scan/success-modal/smart-scan-doc-state-utils'
import { StreamStatus } from 'unlocked-doc-landing/components/document-chat/StreamStatus'
import { SearchInfo } from 'models/search'

export enum Sizing {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
    X_LARGE = 'x_large',
}

export enum DocumentType {
    UNCATEGORIZED_WRITTEN_ASSIGNMENT = 'UncategorizedWrittenAssignment',
    PAPER = 'paper',
    LAB = 'Lab',
}

export const LEARNING_PANEL_TRIGGER = {
    docQuestion: 'Document question',
    answerBubble: 'Answer bubble',
} as const

export type ChatViewPortSize = 'floating' | 'small' | 'large'

export type ViewPortSize =
    | Sizing.SMALL
    | Sizing.MEDIUM
    | Sizing.LARGE
    | Sizing.X_LARGE

export interface ActiveQuestionContent {
    element: HTMLElement | null
    identifier: number | null
    trigger:
        | (typeof LEARNING_PANEL_TRIGGER)[keyof typeof LEARNING_PANEL_TRIGGER]
        | null
}

export interface UnlockedDocCapabilities {
    documentPlatformEnabled: boolean
    includeUQAnswers: boolean
    unlockUQAnswers: boolean
    unlockedTourEnabled: boolean
    canSpotlightCourse: boolean
    answerRailCollapsed: boolean
    isLifecycleStateEnabled: boolean
    chromeExtensionModalEnabled: boolean
    uqEntrypointRedesignEnabled: boolean
}
export const DefaultCapabilities: UnlockedDocCapabilities = {
    documentPlatformEnabled: false,
    includeUQAnswers: true,
    unlockUQAnswers: false, // Unlock UQs for all
    unlockedTourEnabled: false,
    canSpotlightCourse: true,
    answerRailCollapsed: false,
    isLifecycleStateEnabled: false,
    chromeExtensionModalEnabled: false,
    uqEntrypointRedesignEnabled: false,
}
export interface State {
    activeQuestionContent: ActiveQuestionContent
    userId: number
    userName: string
    contentId: number
    filehash: string
    smartScanMode: boolean
    viewerScale: number
    sidebar: SidebarState
    viewPortSize: ViewPortSize
    chatViewPortSize: ChatViewPortSize
    questions: QuestionState
    answers: Answer[]
    onSidebarContentChange: () => void
    averageWaitTimes: Record<string, number>
    currentPage: number
    didLoadRelatedContent: boolean
    showExternalAnswerOnTop?: boolean
    showAnswerRailAskTutor?: boolean
    capabilities: UnlockedDocCapabilities
    documentQuestionChatEnabled: boolean
    documentPaperChatEnabled: boolean
    documentMobilePaperChatEnabled: boolean
    subscriptionType: string
    enrichmentsDisabled: boolean
    isTourActive: boolean
    tourRefs: Record<string, React.RefObject<HTMLElement>>
    isMobile: boolean
    isEducator: boolean
    smartScanDocState: SmartScanDocStateSchema
    showUnlockedTour: boolean
    chatIsOpen: boolean
    chatIsFromAnswerRail: boolean
    chatMessages: { [key: number]: ChatMessage[] }
    chatKey: number
    documentSubject: string
    showChromeExtensionModal: boolean
    documentType?: string
    searchInfo: SearchInfo
}

export type ChatDirection = 'incoming' | 'outgoing'
export type ChatMessageType =
    | 'text'
    | 'tutorAnswer'
    | 'tutorExplanationOnly'
    | 'streaming'
    | 'streamingFollowUp'
    | 'relatedEssayDocuments'
    | 'answerOnly'
    | 'uqAnswer'
    | 'tutorWaitingStep'
    | 'tutorWaitingStepSkipAnimation'
    | 'recommendedQuestions'
    | 'aiAnswerAndExplanation'
    | 'pending'

export interface FollowUp {
    text: string
    onClick: () => void
    copyBucket: number
}

export interface Choice {
    action?: string
    text: string
    onClick: () => void
}

export interface ChatMessage {
    direction: ChatDirection
    text: string
    time: Date
    chosenChoice: number
    choices: Choice[]
    followUps: FollowUp[]
    type: ChatMessageType
    index: number
    explanation: string
    sessionID?: string
    timestamp: number

    // Only set for streaming messages
    messageId?: string
    streamStatus?: StreamStatus
    eventSource?: EventSource
}

export interface UnlockedDocLandingAction {
    type: string
}

export type InitialState = {
    filehash: string
    smartScanMode: boolean
    contentId: number
    userId: number
    userName: string
    showExternalAnswerOnTop?: boolean
    showAnswerRailAskTutor?: boolean
    capabilities: UnlockedDocCapabilities
    documentPaperChatEnabled: boolean
    documentMobilePaperChatEnabled: boolean
    documentQuestionChatEnabled: boolean
    subscriptionType: string
    enrichmentsDisabled: boolean
    isMobile: boolean
    showUnlockedTour: boolean
    chatIsOpen: boolean
    chatIsFromAnswerRail: boolean
    chatMessages: { [key: number]: ChatMessage[] }
    chatKey: number
    documentSubject: string
    showChromeExtensionModal: boolean
    documentType?: string
} & Partial<State>

interface UnlockedLandingProviderProps {
    children: React.ReactNode
    initialState: InitialState
}

export const defaultInitialState: InitialState = {
    filehash: '',
    smartScanMode: false,
    contentId: 0,
    userId: 0,
    userName: '',
    capabilities: DefaultCapabilities,
    documentQuestionChatEnabled: false,
    documentPaperChatEnabled: false,
    documentMobilePaperChatEnabled: false,
    subscriptionType: 'basic',
    enrichmentsDisabled: false,
    isMobile: false,
    isEducator: false,
    showUnlockedTour: false,
    chatIsOpen: false,
    chatIsFromAnswerRail: false,
    chatMessages: {},
    chatKey: -1,
    documentSubject: '',
    showChromeExtensionModal: false,
    documentType: '',
}

const UnlockedLandingProvider = ({
    children,
    initialState = defaultInitialState,
}: UnlockedLandingProviderProps) => {
    const {
        filehash = '',
        smartScanMode = false,
        contentId = 0,
        userId = 0,
        userName = '',
        showExternalAnswerOnTop,
        showAnswerRailAskTutor,
        capabilities = {},
        documentQuestionChatEnabled,
        documentPaperChatEnabled,
        documentMobilePaperChatEnabled,
        subscriptionType,
        enrichmentsDisabled,
        isMobile,
        showUnlockedTour,
        chatIsOpen,
        chatIsFromAnswerRail,
        chatMessages,
        chatKey,
        isEducator,
        documentSubject,
        showChromeExtensionModal,
        documentType,
    } = initialState

    const questions = initialState.questions ?? {}
    const isLifecycleStateEnabled =
        initialState.capabilities.isLifecycleStateEnabled
    Object.keys(questions).forEach((id) => {
        questions[id].isLifecycleStateEnabled = isLifecycleStateEnabled
    })

    const [state, dispatch] = React.useReducer(Reducer, {
        activeQuestionContent: {
            identifier: null,
            element: null,
            trigger: null,
        },
        userId,
        userName,
        contentId,
        filehash,
        smartScanMode,
        viewerScale: 1,
        sidebar: {
            collapsed: true,
        },
        viewPortSize: Sizing.LARGE,
        chatViewPortSize: 'large',
        questions: initialState.questions ?? {},
        answers: initialState.answers ?? [],
        onSidebarContentChange: () => {},
        averageWaitTimes: {},
        currentPage: 0,
        didLoadRelatedContent: !!documentPaperChatEnabled,
        showExternalAnswerOnTop,
        showAnswerRailAskTutor,
        capabilities: {
            ...DefaultCapabilities,
            ...capabilities,
        },
        documentQuestionChatEnabled,
        documentPaperChatEnabled,
        documentMobilePaperChatEnabled,
        subscriptionType,
        enrichmentsDisabled,
        isTourActive: false,
        tourRefs: {},
        smartScanDocState: modalLogicPaths.logged_out,
        isMobile,
        isEducator: !!isEducator,
        showUnlockedTour,
        chatIsOpen,
        chatIsFromAnswerRail,
        chatMessages,
        chatKey,
        documentSubject,
        showChromeExtensionModal,
        documentType,
        searchInfo: {
            searchResults: [],
            searchResultsTotal: 0,
            searchQuery: '',
            searchCount: 0,
        },
    })

    const value = { state, dispatch }

    return (
        <UnlockedLandingContext.Provider value={value}>
            {children}
        </UnlockedLandingContext.Provider>
    )
}

export default UnlockedLandingProvider
