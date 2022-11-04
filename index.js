// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');

console.log('diff works');

function getSortedContent(content) {
  return content
    .match(/[^\r\n]+/g)
    .map((i) => i.trim())
    .filter((i) => !i.includes('#'))
    .sort((a, b) => a.localeCompare(b));
}

function diff() {
  try {
    const leftContent = document.getElementById('left-content').value;
    const rightContent = document.getElementById('right-content').value;
    console.log(leftContent, rightContent);

    const leftSortedLines = getSortedContent(leftContent);
    document.getElementById('left-view').value = leftSortedLines.join('\r\n');

    const sortedContent = getSortedContent(rightContent);

    const comparisonContent = [];

    leftSortedLines.forEach((line, index) => {
      const rightSideLine = sortedContent.find((i) => {
        const [lefttKey] = line.split('=').map((t) => t.trim());
        const [rightKey] = i.split('=').map((t) => t.trim());
        return lefttKey === rightKey;
      });

      if (rightSideLine) {
        comparisonContent[index] = rightSideLine;
      } else {
        comparisonContent[index] = '<----------Not Found------------->';
      }
    });

    document.getElementById('right-view').value =
      comparisonContent.join('\r\n');
  } catch (e) {
    console.log('diff error', e);
  }
}

document.getElementById('diff-btn').addEventListener('click', diff);
