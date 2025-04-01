import { supabase } from '../lib/supabase';
import { problemSeed } from '../data/problems';

export default function SeedProblems() {
  const handleSeed = async () => {
    const uniqueProblems = Array.from(
      new Map(problemSeed.map((p) => [p.id, p])).values()
    );

    const { error } = await supabase
      .from('problems')
      .upsert(uniqueProblems, { onConflict: 'id' });

    if (error) {
      console.error('❌ Error seeding problems:', error.message);
    } else {
      alert('✅ Successfully seeded all 150 problems!');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Seed Problems</h1>
      <button onClick={handleSeed}>Seed to Supabase</button>
    </div>
  );
}
