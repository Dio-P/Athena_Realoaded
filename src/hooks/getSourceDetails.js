// all this logic needs to be rewritten

const findName = (source, lastLinkIndx, linkParts) => {
  const lastLinkFragment = linkParts[lastLinkIndx];

  if (source === 'paper') {
    return lastLinkFragment.split('--')[0].split('-').join(' ');
  }
  if (source === 'confluence') {
    return lastLinkFragment.split('+').join(' ');
  }
  return linkParts[lastLinkIndx].split('-').join(' ');
};

const findSource = (linkParts) => {
  console.log('linkParts***', linkParts);
  const firstLinkFragment = linkParts[1].split('.');
  if (firstLinkFragment.includes('paper')) {
    return 'paper';
  }
  if (firstLinkFragment.includes('github')) {
    return 'github';
  }
  if (firstLinkFragment.includes('zeplin')) {
    return 'zeplin';
  }
  if (firstLinkFragment.includes('confluence')) {
    return 'confluence';
  }
  if (firstLinkFragment.includes('jira')) {
    return 'jira';
  }
  if (firstLinkFragment.includes('figma')) {
    return 'figma';
  }

  return firstLinkFragment[1];
};

const getSourceDetails = (links) => {
  console.log('inside getSourceDetails@@', links);

  const seperateLinkParts = (link) => (link
    .split('/')
    .filter((fragment) => (
      fragment !== ''
    ))
  );

  const linksPartsCollection = links.map((link) => (
    seperateLinkParts(link)
  ));

  const linksSourcesArray = () => {
    const sources = linksPartsCollection.map((linkParts) => {
      const lastLinkIndx = (linkParts.length - 1);
      const source = findSource(linkParts);
      const name = findName(source, lastLinkIndx, linkParts);

      return [source, name];
    });

    return sources;
  };

  return [linksSourcesArray];
};

export default getSourceDetails;

// fetch(https://github.com/Dio-P/Athena/blob/main/src/components/AddNewConnectionBlock.js)
// https://paper.dropbox.com/doc/Imposter-syndrome-workshop-ideas--BtYF4rZRzasgUTPjgE7J0osIAg-vIsKjOV2rmXL6H3g39LgZ
// https://jira.dev.bbc.co.uk/browse/DPUB-6213
// https://confluence.dev.bbc.co.uk/display/NEWSART/Optimo+Articles+Runbook
// https://www.figma.com/file/7yWk1gL1qNHSX47b55sqOC/Optimo-Design-resources?mode=dev
