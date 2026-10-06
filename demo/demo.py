"""
Elaris Theme - Python Demo
Clean daylight syntax testing: dataclasses, decorators, typing, and docstrings.
"""

from __future__ import annotations
import time
import functools
from dataclasses import dataclass, field
from typing import Callable, Any, TypeVar, Optional, List

T = TypeVar("T")


def profile_execution(func: Callable[..., T]) -> Callable[..., T]:
    """Decorator to measure and log execution runtime in milliseconds."""
    @functools.wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> T:
        start = time.perf_counter()
        try:
            return func(*args, **kwargs)
        finally:
            duration_ms = (time.perf_counter() - start) * 1000.0
            print(f"[Elaris Benchmark] {func.__name__} took {duration_ms:.2f}ms")
    return wrapper


@dataclass
class DaylightWorkspace:
    """Represents an active developer daylight focus session."""
    workspace_name: str
    target_hours: float = 4.0
    active_branches: List[str] = field(default_factory=list)
    is_focused: bool = True
    session_rating: Optional[float] = None

    def complete_block(self, rating: float) -> None:
        """Mark workspace block as evaluated."""
        self.session_rating = min(10.0, max(0.0, rating))
        print(f"Evaluated session '{self.workspace_name}' with score: {self.session_rating}")

    def __repr__(self) -> str:
        return f"<DaylightWorkspace name={self.workspace_name!r} active={self.is_focused}>"


@profile_execution
def bootstrap_environment(project_name: str, branches: List[str]) -> DaylightWorkspace:
    """Initialize daylight configuration for active project."""
    if not project_name.strip():
        raise ValueError("Project name cannot be empty.")

    return DaylightWorkspace(
        workspace_name=project_name,
        target_hours=6.5,
        active_branches=branches,
    )


if __name__ == "__main__":
    session = bootstrap_environment("elaris-core", ["main", "feature/daylight-syntax"])
    print(session)
