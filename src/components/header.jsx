export default function Header({ toggleDark }) {
  return (
    <>
      <div class="navbar bg-base-100">
        <div class="flex-1">
          <div className="flex">
            <a class="btn btn-ghost text-xl">CustomMorse</a>
            <div id="caption" className="flex self-center">
              Create your custom morse code!
            </div>
          </div>
        </div>
        <div class="flex-none">
          {/* dark mode toggle */}
          <input
            type="checkbox"
            className="toggle"
            defaultChecked
            onClick={toggleDark}
          />
        </div>
      </div>
    </>
  );
}
