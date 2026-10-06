-- Elaris Theme - SQL Query Demo
-- Aggregations, window functions, and CTEs

WITH ActiveDaylightSessions AS (
  SELECT
    developer_id,
    session_id,
    duration_hours,
    focus_efficiency,
    ROW_NUMBER() OVER (
      PARTITION BY developer_id
      ORDER BY session_started_at DESC
    ) AS session_order
  FROM developer_workspaces
  WHERE session_type = 'DAYLIGHT'
    AND session_started_at >= CURRENT_DATE - INTERVAL '14 days'
)
SELECT
  d.developer_id,
  d.handle,
  d.team_name,
  COUNT(s.session_id) AS total_sessions,
  ROUND(AVG(s.duration_hours), 2) AS avg_duration_hrs,
  ROUND(AVG(s.focus_efficiency)::numeric, 3) AS avg_efficiency
FROM developers d
JOIN ActiveDaylightSessions s
  ON d.developer_id = s.developer_id
WHERE s.session_order <= 10
GROUP BY d.developer_id, d.handle, d.team_name
HAVING COUNT(s.session_id) >= 3
ORDER BY avg_efficiency DESC;
