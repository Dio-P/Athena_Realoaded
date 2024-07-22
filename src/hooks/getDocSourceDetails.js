// all this logic needs to be rewritten
// I need something more agnostic to be working or with everything
// or by using an object containing all the things we regularly use

const findName = (source, lastLinkIndx, linkParts) => {
  const lastLinkFragment = linkParts[lastLinkIndx];

  if (source === 'paper') {
    return lastLinkFragment.split('--')[0].split('-').join(' ');
  }
  if (source === 'confluence') {
    return lastLinkFragment.split('+').join(' ');
  }
  if (source === 'github' || 'zeplin' || 'jira' || 'figma') {
    return linkParts[lastLinkIndx].split('-').join(' ');
  }
  return lastLinkFragment;
};

const findSource = (linkParts) => {
  console.log('linkParts***', linkParts);
  const firstLinkFragment = linkParts[1] ? linkParts[1].split('.') : linkParts[0].split('.');
  console.log('firstLinkFragment', firstLinkFragment);
  if (firstLinkFragment) {
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
  }

  console.log('firstLinkFragment', firstLinkFragment);
  console.log('firstLinkFragment[1]', firstLinkFragment[1]);
  return firstLinkFragment[1];
};

const seperateLinkParts = (link) => (link
  .split('/')
  .filter((fragment) => (
    fragment !== ''
  ))
);

const getDocSourceDetails = (link) => {
  console.log('inside getDocSourceDetails@@', link);

  // const linksPartsCollection = links.map((link) => (
  //   seperateLinkParts(link)
  // ));

  // const linksSourcesArray = () => {
  //   const sources = linksPartsCollection.map((linkParts) => {
  //     const lastLinkIndx = (linkParts.length - 1);
  //     const source = findSource(linkParts);
  //     const name = findName(source, lastLinkIndx, linkParts);

  //     return [source, name];
  //   });
  //   return sources;
  // }
  const seperatedLinkParts = seperateLinkParts(link);
  const lastLinkIndx = (seperatedLinkParts.length - 1);
  const source = findSource(seperatedLinkParts);
  const name = findName(source, lastLinkIndx, seperatedLinkParts);

  return { source, name };
};

export default getDocSourceDetails;

// fetch(https://github.com/Dio-P/Athena/blob/main/src/components/AddNewConnectionBlock.js)
// https://paper.dropbox.com/doc/Imposter-syndrome-workshop-ideas--BtYF4rZRzasgUTPjgE7J0osIAg-vIsKjOV2rmXL6H3g39LgZ
// https://jira.dev.bbc.co.uk/browse/DPUB-6213
// https://confluence.dev.bbc.co.uk/display/NEWSART/Optimo+Articles+Runbook
// https://www.figma.com/file/7yWk1gL1qNHSX47b55sqOC/Optimo-Design-resources?mode=dev
