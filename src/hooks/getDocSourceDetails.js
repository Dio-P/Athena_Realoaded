// all this logic needs to be rewritten
// I need something more agnostic to be working or with everything
// or by using an object containing all the things we regularly use

const findName = (source, lastLinkIndx, linkParts) => {
  const lastLinkFragment = linkParts[lastLinkIndx];
  console.log('!!source inside findAName', source);
  console.log('!!lastLinkFragment', lastLinkFragment);
  console.log("lastLinkFragment.split('.')", lastLinkFragment.split('.'));

  if (source === 'paper') {
    console.log('inside source paper');
    return lastLinkFragment.split('--')[0].split('-').join(' ');
  }
  if (source === 'confluence') {
    return lastLinkFragment.split('+').join(' ');
  }
  if (source === 'github' || 'zeplin' || 'jira' || 'figma') {
    return linkParts[lastLinkIndx].split('-').join(' ');
  }
  const singleFragmentLinkParts = lastLinkFragment.split('.');
  return singleFragmentLinkParts[1];
};

// gemini refactoring.....
// const findName = (source, lastLinkIndx, linkParts) => {
//   const lastLinkFragment = linkParts[lastLinkIndx];

//   const nameMapping = {
//     paper: () => lastLinkFragment.split('--')[0].split('-').join(' '),
//     confluence: () => lastLinkFragment.split('+').join(' '),
//     github: () => lastLinkFragment.split('-').join(' '),
//     zeplin: () => lastLinkFragment.split('-').join(' '),
//     jira: () => lastLinkFragment.split('-').join(' '),
//     figma: () => lastLinkFragment.split('-').join(' '),
//     default: () => lastLinkFragment.split('.')[1],
//   };

//   return nameMapping[source]?.() || nameMapping.default();
// };

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

// gemini refactoring...
// const findSource = (linkParts) => {
//   const firstLinkFragment = (linkParts[1] || linkParts[0]).split('.');

//   const sources = ['paper', 'github', 'zeplin', 'confluence', 'jira', 'figma'];

//   for (const source of sources) {
//     if (firstLinkFragment.includes(source)) {
//       return source;
//     }
//   }

//   return firstLinkFragment[1];
// };

const seperateLinkParts = (link) => (link
  .split('/')
  .filter((fragment) => (
    fragment !== ''
  ))
);

const getDocSourceDetails = (link) => {
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
  console.log('inside getDocSourceDetails@@', link);
  const seperatedLinkParts = seperateLinkParts(link);
  console.log('seperatedLinkParts@@', seperatedLinkParts);
  const lastLinkIndx = (seperatedLinkParts.length - 1);
  console.log('lastLinkIndx@@', lastLinkIndx);
  const source = findSource(seperatedLinkParts);
  console.log('source@@', source);
  const name = findName(source, lastLinkIndx, seperatedLinkParts);
  console.log('name@@', name);

  return { source, name };
};

export default getDocSourceDetails;

// gemini turning this into a helper function

// const extractDocSourceDetails = (link) => {
//   const splitLinkIntoParts = (link) => link.split('/').filter(fragment => fragment !== '');

//   const findSource = (linkParts) => {
//     const firstLinkFragment = (linkParts[1] || linkParts[0]).split('.');

//     const sources = ['paper', 'github', 'zeplin', 'confluence', 'jira', 'figma'];

//     for (const source of sources) {
//       if (firstLinkFragment.includes(source)) {
//         return source;
//       }
//     }

//     return firstLinkFragment[1];
//   };

//   const findName = (source, lastLinkIndx, linkParts) => {
//     const lastLinkFragment = linkParts[lastLinkIndx];

//     const nameMapping = {
//       paper: () => lastLinkFragment.split('--')[0].split('-').join(' '),
//       confluence: () => lastLinkFragment.split('+').join(' '),
//       github: () => lastLinkFragment.split('-').join(' '),
//       zeplin: () => lastLinkFragment.split('-').join(' '),
//       jira: () => lastLinkFragment.split('-').join(' '),
//       figma: () => lastLinkFragment.split('-').join(' '),
//       default: () => lastLinkFragment.split('.')[1],
//     };

//     return nameMapping[source]?.() || nameMapping.default();
//   };

//   const linkParts = splitLinkIntoParts(link);
//   const lastLinkIndx = linkParts.length - 1;
//   const source = findSource(linkParts);
//   const name = findName(source, lastLinkIndx, linkParts);

//   return { source, name };
// };

// export default extractDocSourceDetails;

// fetch(https://github.com/Dio-P/Athena/blob/main/src/components/AddNewConnectionBlock.js)
// https://paper.dropbox.com/doc/Imposter-syndrome-workshop-ideas--BtYF4rZRzasgUTPjgE7J0osIAg-vIsKjOV2rmXL6H3g39LgZ
// https://jira.dev.bbc.co.uk/browse/DPUB-6213
// https://confluence.dev.bbc.co.uk/display/NEWSART/Optimo+Articles+Runbook
// https://www.figma.com/file/7yWk1gL1qNHSX47b55sqOC/Optimo-Design-resources?mode=dev
