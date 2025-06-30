"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AwardIcon } from "lucide-react";
import type { Member } from "@/lib/types";

interface MemberBioProps {
  member: Member;
}

export default function MemberBio({ member }: MemberBioProps) {
  return (
    <Card className="bg-zinc-900">
      <CardContent className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Biography Section */}
          <h2 className="text-2xl font-bold mb-4">Biography</h2>
          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-gray-300 whitespace-pre-line">{member.bio}</p>
          </div>

          {/* Awards Section */}
          {member.awards && member.awards.length > 0 && (
            <div className="border-t border-zinc-800 pt-8">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AwardIcon size={20} />
                <span>Awards & Recognition</span>
              </h3>
              <ul className="space-y-3">
                {member.awards.map((award, index) => (
                  <li
                    key={index}
                    className="border-b border-zinc-800 pb-3 last:border-0"
                  >
                    <p className="font-medium">{award.title}</p>
                    <p className="text-sm text-gray-400">
                      {award.year} • {award.organization}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
}
