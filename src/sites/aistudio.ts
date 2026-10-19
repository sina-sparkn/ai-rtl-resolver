import {
  applyDetectedDirection,
  forceLtrDirection,
  getElementText,
  observeBodyMutations,
} from '../lib/dom';
import { initKatexDirectionFix } from '../lib/katex';

const MODEL_TURN = 'ms-chat-turn .chat-turn-container.model';

const LTR_ONLY_SELECTOR = [
  `${MODEL_TURN} pre`,
  `${MODEL_TURN} code`,
  '.katex-html',
].join(', ');

const APPLY_DIRECTION_SELECTOR = [
  'ms-prompt-input-wrapper textarea',
  'table',
  `${MODEL_TURN} ms-cmark-node.cmark-node`,
  ...['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'blockquote', 'blockquote > p'].map(
    (tag) => `${MODEL_TURN} ${tag}`,
  ),
].join(', ');

function fixAistudioDirection(): void {
  applyDetectedDirection(
    document.querySelectorAll(APPLY_DIRECTION_SELECTOR),
    getElementText,
  );
  forceLtrDirection(document.querySelectorAll(LTR_ONLY_SELECTOR));
}

export function initAistudio(): void {
  fixAistudioDirection();
  observeBodyMutations(fixAistudioDirection);
  initKatexDirectionFix();
}
