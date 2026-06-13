/**
 * OSINT Agent - Usage Examples
 * Demonstrates how to use the agent in different scenarios
 */

const OSINTAgent = require('../src/osint-agent');

// Initialize agent
const agent = new OSINTAgent({
  githubToken: process.env.GITHUB_TOKEN,
  cache: true,
  logLevel: 'info'
});

/**
 * Example 1: Quick Profile Analysis
 */
async function example1_quickAnalysis() {
  console.log('\n=== EXAMPLE 1: Quick Profile Analysis ===\n');
  
  try {
    const profile = await agent.analyzePerson('torvalds'); // Linus Torvalds
    
    console.log('Profile Summary:');
    console.log(`  Name: ${profile.name}`);
    console.log(`  Username: ${profile.username}`);
    console.log(`  Location: ${profile.location}`);
    console.log(`  Public Repos: ${profile.repos}`);
    console.log(`  Followers: ${profile.followers}`);
    console.log(`  Top Languages: ${profile.languages.join(', ')}`);
    console.log(`  Risk Score: ${profile.riskScore}/1.0 (${profile.riskLevel})`);
    console.log(`  Last Active: ${profile.lastActive}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 2: Deep Intelligence Gathering
 */
async function example2_deepIntelligence() {
  console.log('\n=== EXAMPLE 2: Deep Intelligence Gathering ===\n');
  
  try {
    const report = await agent.gatherIntelligence('gvanrossum', {
      depth: 'full',
      includeConnections: true,
      includeSocial: true
    });
    
    console.log('Intelligence Report:');
    console.log(`  Subject: ${report.subject.name}`);
    console.log(`  Repositories: ${report.repositories.repos.length}`);
    console.log(`  Top Languages: ${report.analysis.techStack.join(', ')}`);
    console.log(`  Specialties: ${report.analysis.specialties.join(', ')}`);
    console.log(`  Public Emails: ${report.intelligence.publicEmails.join(', ')}`);
    console.log(`  Social Profiles: ${report.intelligence.socialProfiles.length}`);
    console.log(`  Confidence: ${report.report.confidence}%`);
    console.log(`  Activity Trend: ${report.timeline.trend}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 3: Team Analysis
 */
async function example3_teamAnalysis() {
  console.log('\n=== EXAMPLE 3: Analyze Multiple Team Members ===\n');
  
  try {
    const team = ['mojombo', 'dhh', 'wycats']; // GitHub founders + Rails creator
    
    const results = await agent.analyzeMultiple(team);
    
    console.log('Team Analysis:');
    console.log('─'.repeat(70));
    
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const profile = result.profile;
        console.log(`${index + 1}. ${profile.username}`);
        console.log(`   Name: ${profile.name}`);
        console.log(`   Repos: ${profile.repos} | Followers: ${profile.followers}`);
        console.log(`   Languages: ${profile.languages.slice(0, 3).join(', ')}`);
        console.log(`   Risk: ${profile.riskLevel}`);
        console.log('');
      }
    });
    
    // Summary statistics
    const fulfilled = results.filter(r => r.status === 'fulfilled');
    const avgRepos = fulfilled.reduce((sum, r) => sum + r.profile.repos, 0) / fulfilled.length;
    const avgFollowers = fulfilled.reduce((sum, r) => sum + r.profile.followers, 0) / fulfilled.length;
    
    console.log('─'.repeat(70));
    console.log('Team Summary:');
    console.log(`  Average Repos: ${avgRepos.toFixed(1)}`);
    console.log(`  Average Followers: ${avgFollowers.toFixed(0)}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 4: Network Mapping
 */
async function example4_networkMapping() {
  console.log('\n=== EXAMPLE 4: Map Collaborator Network ===\n');
  
  try {
    const network = await agent.mapConnections('rails', {
      depth: 2
    });
    
    console.log('Network Analysis:');
    console.log(`  Central Node: ${network.center}`);
    console.log(`  Direct Collaborators: ${network.nodes?.length || 0}`);
    console.log(`  Connections: ${network.edges?.length || 0}`);
    
    if (network.nodes && network.nodes.length > 0) {
      console.log('\n  Top Collaborators:');
      network.nodes.slice(0, 5).forEach((node, i) => {
        console.log(`    ${i + 1}. ${node.name} (${node.connections} collaborations)`);
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 5: Risk Assessment
 */
async function example5_riskAssessment() {
  console.log('\n=== EXAMPLE 5: Security Risk Assessment ===\n');
  
  try {
    const targets = ['golang', 'python', 'julia'];
    
    console.log('Risk Assessment Results:');
    console.log('─'.repeat(50));
    
    for (const target of targets) {
      const assessment = await agent.assessRisk(target);
      
      console.log(`${target}:`);
      console.log(`  Risk Score: ${(assessment.score * 100).toFixed(0)}/100`);
      console.log(`  Risk Level: ${assessment.level}`);
      
      if (assessment.details.length > 0) {
        console.log(`  Indicators:`);
        assessment.details.forEach(detail => {
          console.log(`    • ${detail}`);
        });
      } else {
        console.log(`  ✓ No suspicious indicators detected`);
      }
      console.log('');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 6: Activity Timeline
 */
async function example6_activityTimeline() {
  console.log('\n=== EXAMPLE 6: User Activity Timeline ===\n');
  
  try {
    const profile = await agent.analyzePerson('golang');
    
    console.log(`Activity for ${profile.username}:`);
    console.log(`  Last Active: ${profile.lastActive}`);
    console.log(`  Total Contributions: ${profile.contributions}`);
    
    // Note: Full timeline requires gatherIntelligence
    const report = await agent.gatherIntelligence('golang');
    
    console.log(`\nActivity Summary:`);
    console.log(`  Last Event: ${report.timeline.summary.lastEvent}`);
    console.log(`  Recent Events: ${report.timeline.summary.totalEvents}`);
    console.log(`  Event Types: ${report.timeline.summary.eventTypes.join(', ')}`);
    console.log(`  Trend: ${report.timeline.trend}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 7: Comparative Analysis
 */
async function example7_comparativeAnalysis() {
  console.log('\n=== EXAMPLE 7: Comparative Developer Analysis ===\n');
  
  try {
    const developers = ['golang', 'rust-lang', 'python'];
    const results = await agent.analyzeMultiple(developers);
    
    console.log('Developer Comparison:');
    console.log('─'.repeat(80));
    console.log('Name'.padEnd(20) + 'Repos'.padEnd(10) + 'Followers'.padEnd(15) + 'Risk'.padEnd(10));
    console.log('─'.repeat(80));
    
    results
      .filter(r => r.status === 'fulfilled')
      .sort((a, b) => b.profile.repos - a.profile.repos)
      .forEach(result => {
        const p = result.profile;
        console.log(
          p.username.padEnd(20) +
          p.repos.toString().padEnd(10) +
          p.followers.toString().padEnd(15) +
          p.riskLevel.padEnd(10)
        );
      });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 8: Cache Management
 */
async function example8_cacheManagement() {
  console.log('\n=== EXAMPLE 8: Cache Management ===\n');
  
  try {
    console.log('Agent Status:', agent.getStatus());
    
    // Make a request (will be cached)
    const profile1 = await agent.analyzePerson('golang');
    console.log('After first request:');
    console.log('  Status:', agent.getStatus().cache);
    
    // Second request (from cache)
    const profile2 = await agent.analyzePerson('golang');
    console.log('Profiles match from cache:', profile1.username === profile2.username);
    
    // Clear specific cache
    agent.clearCache('person:golang');
    console.log('Cache cleared for golang');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Run all examples
 */
async function runAllExamples() {
  const examples = [
    { name: 'Quick Analysis', fn: example1_quickAnalysis },
    { name: 'Deep Intelligence', fn: example2_deepIntelligence },
    { name: 'Team Analysis', fn: example3_teamAnalysis },
    { name: 'Network Mapping', fn: example4_networkMapping },
    { name: 'Risk Assessment', fn: example5_riskAssessment },
    { name: 'Activity Timeline', fn: example6_activityTimeline },
    { name: 'Comparative Analysis', fn: example7_comparativeAnalysis },
    { name: 'Cache Management', fn: example8_cacheManagement }
  ];

  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║        OSINT Agent - Usage Examples                    ║');
  console.log('╚════════════════════════════════════════════════════════╝');

  for (const example of examples) {
    try {
      await example.fn();
      await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limiting
    } catch (error) {
      console.error(`Error in ${example.name}:`, error.message);
    }
  }

  console.log('\n✓ All examples completed');
}

// Run examples if this file is executed directly
if (require.main === module) {
  runAllExamples().catch(console.error);
}

module.exports = {
  example1_quickAnalysis,
  example2_deepIntelligence,
  example3_teamAnalysis,
  example4_networkMapping,
  example5_riskAssessment,
  example6_activityTimeline,
  example7_comparativeAnalysis,
  example8_cacheManagement
};
