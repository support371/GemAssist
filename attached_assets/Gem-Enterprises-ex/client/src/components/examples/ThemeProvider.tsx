import { ThemeProvider } from '../ThemeProvider';

export default function ThemeProviderExample() {
  return (
    <ThemeProvider>
      <div className="p-8 space-y-4">
        <h3 className="text-2xl font-bold">Theme Provider Test</h3>
        <p className="text-muted-foreground">
          This component provides theme context to the entire application.
          The theme will persist across page reloads and respect system preferences.
        </p>
        <div className="p-4 border rounded-lg">
          <p>Background adapts to current theme</p>
        </div>
      </div>
    </ThemeProvider>
  );
}