export default function DifficultyRadioBtn({ value, onChange }) {
    const difficulties = [
        { value: 'easy', label: 'Easy', color: 'green-600' },
        { value: 'medium', label: 'Medium', color: 'yellow-500' },
        { value: 'hard', label: 'Hard', color: 'red-600' }
    ];

    return (
        <div className='flex gap-4 font-bold text-shadow-sm pl-4'>
            {difficulties.map(d => (
                <label key={d.value} className={`text-${d.color}`}>
                    <input
                        type='radio'
                        name='difficulty'
                        value={d.value}
                        checked={value === d.value}
                        onChange={e => onChange(e)}
                        className='mr-1'
                        required
                    />
                    {d.label}
                </label>
            ))}
        </div>
    );
}
